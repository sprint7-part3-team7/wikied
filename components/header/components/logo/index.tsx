import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/icons/logo/logo.svg";

const Logo = () => {
  return (
    <h1>
      <Link href="/">
        <Image src={logo} alt="위키드" width={107} height={80} />
      </Link>
    </h1>
  );
};

export default Logo;
