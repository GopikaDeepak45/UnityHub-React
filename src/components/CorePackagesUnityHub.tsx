import { useGetLandingPageQuery } from "@/redux/apiSlices/landingPageSlice";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface CorePackage {
    name: string;
    image: {
        url: string;
        publicId: string;
    };
    shortDescription: string;
}

const CorePackagesUnityHub: React.FC = () => {
    const { data: landingPageData } = useGetLandingPageQuery(undefined);

    return (
        <div className="container mx-auto flex-1 py-10">
            <h1 className="text-4xl font-bold text-black-600 m-7">Core Packages</h1>
            <div className="flex flex-wrap gap-10">
                {landingPageData?.corePackage.map((corePackage: CorePackage, index: number) => (
                    <div className="w-full sm:w-1/4 " key={index}>
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle><img src={corePackage.image.url} alt="" /></CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{corePackage.shortDescription}</p>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CorePackagesUnityHub;
