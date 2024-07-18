
import { useGetLandingPageQuery } from "@/redux/apiSlices/landingPageSlice";
import pic1 from "../assets/pic1.png";

const About = () => {
  const { data: landingPageData, } = useGetLandingPageQuery(undefined);
  return (
    <div className="container mx-auto flex-1 py-10">

    
    <div className="flex flex-wrap gap-4 lg:flex-nowrap">
    <div id="about">
      <h1 className="text-4xl font-bold  text-black-600 mb-7">About Us</h1>
      <p>
        Welcome to Community Hub, the premier residential community website.
        Our platform allows users within the same community to share services
        and communicate easily. Also features like notifications and SMS
        alert, management can easily keep the community informed. Whether you
        are looking for local services or want to join groups, our platform is
        designed to bring the community together. Join us today and experience
        the convenience of connecting with neighbours and accessing various
        services all in one place.{" "}
      </p>
    </div>
    <div></div>
    <div className=" lg:w-full">
      
      <img src={landingPageData?.about?landingPageData.about.image.url:pic1} alt="Group Image " className="object-cover h-60" />
    </div>
  </div>
  </div>
  )
}

export default About