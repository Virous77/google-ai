import ThemeToggle from "../theme/theme";

const Navbar = () => {
  return (
    <nav
      className=" fixed top-0 w-[90%] md:w-[80%] bg-background z-10 rounded-[30px] py-2 left-0 flex items-center justify-between px-4 mt-[24px]"
      style={{ transform: "translate(-50%, -50%)", left: "50%" }}
    >
      <h1 className=" tracking-wider text-2xl text-primary cursor-pointer font-bold">
        Google
      </h1>

      <div>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
