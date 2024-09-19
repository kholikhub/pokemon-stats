import Link from "next/link";

const Navigation = () => {

  return (
    <nav className="flex flex-wrap justify-end items-center font-semibold">
      <ul className="flex flex-wrap justify-end items-center">
        <li>
          <Link href="/" className="flex flex-wrap text-center relative mx-3 hover:underline">Home</Link>
        </li>
        <li>
          <Link href="/login/register" className="flex flex-wrap text-center relative mx-3 hover:underline">Register</Link>
        </li>
        <li>
          <Link href="/login/formLogin" className="flex flex-wrap text-center relative mx-3 hover:underline">Login</Link>
        </li>

      </ul>
    </nav>
  );
};

export default Navigation;
