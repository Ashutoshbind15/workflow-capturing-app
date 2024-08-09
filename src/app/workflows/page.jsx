import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { WorkFlow } from "@/models/WorkFlows";
import { getToken } from "@/utils/auth";
import connectDB from "@/utils/db";
import Image from "next/image";
import { redirect } from "next/navigation";

const WorkFlowPage = async ({ searchParams }) => {
  const token = await getToken();
  if (!token) {
    return redirect("/auth/login");
  }

  const pageNumber = searchParams.page ? parseInt(searchParams.page) : 1;
  const take = 10;
  const uid = token.user.sub;
  await connectDB();

  const workflows = await WorkFlow.find({
    user: uid,
    shots: { $exists: true, $type: "array", $ne: [] },
  })
    .skip((pageNumber - 1) * take)
    .limit(take)
    .sort({ createdAt: -1 });

  return (
    <div className="flex flex-wrap gap-x-6 gap-y-4">
      {workflows.map((workflow) => (
        <div
          key={workflow._id}
          className="py-10 my-12 rounded-md border-2 border-gray-200"
        >
          <Carousel
            opts={{
              align: "start",
            }}
            orientation="vertical"
            className="w-full max-w-xs"
          >
            <CarouselContent className="-mt-1 h-[200px]">
              {workflow?.shots?.map((shot, index) => (
                <CarouselItem key={index} className="pt-1 md:basis-1/2">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex items-center justify-center p-6">
                        <Image
                          src={shot?.url}
                          alt={shot?.title}
                          height={100}
                          width={200}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      ))}
    </div>
  );
};

export default WorkFlowPage;
