import MemeGenerator from "@/components/MemeGenerator";
import Navbar from "@/components/Navbar";


export default function Home() {
  return (
    <>
      <Navbar />
      <div className='px-[20px] md:px-[36px]'>
    <MemeGenerator />
      </div>
    </>
  )
}
