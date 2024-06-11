import Image from 'next/image'
import styles from './page.module.css'
import Signup from "./signup/page";
import Login from './login/page';

export default function Home() {
  return (
    <>
     <Signup />
    </>
  )
}
