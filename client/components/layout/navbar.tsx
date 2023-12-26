import ThemeToggle from "../theme/theme";

const Navbar = () => {
  return (
    <nav
      className=" fixed top-14 w-[90%] md:w-[80%] bg-accent z-10 rounded-[30px] p-4 left-0 flex items-center justify-between px-4"
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
