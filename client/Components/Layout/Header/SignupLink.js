import React from "react";
import Link from "next/link";
import styles from "./header.module.css";

const SignupLink = () => {
  return (
    <span className="primary-hover uppercase" style={{ marginRight: "1.5rem" }}>
      <Link href="/auth/signup">sign up</Link>
    </span>
  );
};

export default SignupLink;
