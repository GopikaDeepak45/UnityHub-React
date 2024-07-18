import { useGetLandingPageQuery } from "@/redux/apiSlices/landingPageSlice";
import { Card, CardHeader, CardTitle } from "./ui/card";

const CommonImages: React.FC = () => {
    const { data: landingPageData } = useGetLandingPageQuery(undefined);

    return (
        <>
            <div className="flex flex-wrap mt-10 mb-20 brightness-50 ">
                {landingPageData?.images.map((img: { url:string }, index: number) => (
                    <div className="w-full sm:w-1/4  " key={index}>
                        <Card>
                            <CardHeader className="h-48 p-0">
                                <CardTitle className="h-full"><img src={img.url} alt="" className="object-cover h-full w-full" /></CardTitle>
                            </CardHeader>
                            {/* You can add a description if needed */}
                            {/* <CardContent>
                                <p>Description here</p>
                            </CardContent> */}
                        </Card>
                    </div>
                ))}
            </div>
        </>
    );
};

export default CommonImages;
