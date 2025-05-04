import DarkNavbar from "@/components/darknavbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function DetailArticles() {
  return (
    <>
      <DarkNavbar />
      <div className="w-full h-screen">
        <div className="w-full h-full py-[40px] px-[160px] gap-[24px] flex items-center justify-center">
            <div className="max-w-[400px] w-full h-fit rounded-xl py-[24px] px-[16px] gap-[36px] flex flex-col justify-center">
                <h1 className="text-xl font-semibold text-slate-900 text-center">
                    User Profile
                </h1>
                <div className="w-full h-fit gap-[24px] flex flex-col items-center">
                    <img src="/profile.png" className="w-[68px] h-[68px] rounded-[100px] "></img>
                    <div className="w-full flex flex-col">
                        <div className="w-full h-fit rounded-[6px] border-[1px] flex justify-between py-[10px] px-[12px] bg-gray-100 border-slate-200">
                            <div className="w-[97px] h-fit gap-[16px] flex flex-row justify-between">
                                <p>Username</p>
                                <p>:</p>
                            </div>
                            <p className="text-center text-base w-full">
                                James Dean
                            </p>
                        </div>
                        <div className="w-full h-fit rounded-[6px] border-[1px] flex justify-between py-[10px] px-[12px] bg-gray-100 border-slate-200">
                            <div className="w-[97px] h-fit gap-[16px] flex flex-row justify-between">
                                <p>Password</p>
                                <p>:</p>
                            </div>
                            <p className="text-center text-base w-full">
                                Admin123
                            </p>
                        </div>
                        <div className="w-full h-fit rounded-[6px] border-[1px] flex justify-between py-[10px] px-[12px] bg-gray-100 border-slate-200">
                            <div className="w-[97px] h-fit flex flex-row justify-between">
                                <p>Role</p>
                                <p>:</p>
                            </div>
                            <p className="text-center text-base w-full">
                                User
                            </p>
                        </div>
                    </div>
                </div>
                <Button className="bg-blue-600">Back to home</Button>
            </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
