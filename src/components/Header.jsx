export const Header = ({title}) => {
  return (
    <header className=" dark:text-white pt-3">
      <nav className="w-screen lg:max-w-6xl md:max-w-4xl mx-auto ">
        <h1 className="text-4xl font-normal">{title}</h1>
      </nav>
    </header>
  );
};
