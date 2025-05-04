function DarkNavbar() {
    return (
    <div className="relative">
      <div className="absolute top-0 w-full z-10">
        <div className="flex justify-between items-center px-[60px] py-[32px]">
          <img src="logoipsum.png" alt="Logo" />
          <div className="flex flex-row items-center">
            <img src="/profile.png"></img>
            <div className="text-base px-2">
                James Dean
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
  
  export default DarkNavbar;