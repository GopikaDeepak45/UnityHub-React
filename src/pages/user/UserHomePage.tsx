import CommunityBanner from '@/components/CommunityBanner';
import Middleee from '@/components/Middleee';
import Right from '@/components/Right';
import Header from '@/components/Header';
import CommunityNavigation from '@/components/CommunityNavigation';
import Left from '@/components/Left';
const UserHomePage = () => {

  return (
    <div>
      <Header />
     
      <CommunityBanner />
      <CommunityNavigation />
      <main className=" mt-3 px-5 lg:px-32 min-h-screen">
        <div className="flex flex-wrap gap-5">
          <Left />
          
          <Middleee />
          <Right />
        </div>
      </main>
       {/* <CommunityPage/> */}
      {/* <CommunityBanner2/> */}
    </div>

  )
}

export default UserHomePage

{/* <div>
       
       <div className="bg-scroll h-screen object-fill relative opacity-30" 
         style={{
           backgroundImage: `url(${hands})`,
           backgroundSize: 'cover',
           backgroundRepeat: 'no-repeat',
           backgroundPosition: 'center'
         }}>
         
          <Header />
          
          
      sfwsedfsdfsdfsgerghghdfbcdfbvdfvd
    </div> 
    
       </div>*/}