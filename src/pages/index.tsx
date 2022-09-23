import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useTheme as useNextTheme } from 'next-themes'
import { useTheme } from '@nextui-org/react'
// import { createStitches } from '@stitches/react';

import {
  Container,
  Grid,
  Card,
  Row,
  Button,
  Input,
  Spacer,
  Text,
  Link,
  Switch,
} from '@nextui-org/react';


interface LinkCardProops {
  url:string;
  title:string; 
  text:string;
}

// リンクカード
const LinkCard = ( props:LinkCardProops ) => {
  return (
    <>
      <Link href={props.url}>

        <Card isHoverable isPressable variant = "bordered" css={{ mw: "400px" }}>
          <Card.Body>
            <Text
              css={{ textGradient: "45deg, $blue500 -30%, $red500 100%" }}
              h2
            >{`${props.title} ->`}</Text>
            <Text >{props.text}</Text>
          </Card.Body>
        </Card>
      </Link>
    </>
  )
}




const Home: NextPage = () => {

  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();
  return (
    <div className={styles.container}>
      <Head>
        <title>NextUI | Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Text b> The current theme is:</Text>
      <Text size={21} color="Yellow" b > {type} </Text>
      <Spacer y={0.1}/>
      <Switch shadow color="warning"
        checked={isDark}
        onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
        css ={{paddingLeft:"70px"}}
      />
      <Spacer y={0.1} />

    <Input placeholder="Next UI2" />;
      <main className={styles.main}>
        <Text size={60} h1 b>
          Welcome to{" "}
          <Link
            href="https://nextjs.org"
            css={{ textGradient: "45deg, $purple500 -20%, $pink500 100%" }}
          >
            Next.js!
          </Link>
 
        </Text>

        <Row justify="center" align="center" gap={2}>
          <Text b size={25}>
            Get started by editing
          </Text>
          <Card
            isHoverable
            color="gradient"
            css={{ maxW: 150, alignItems: "center" }}
          >
            pages/index.js
          </Card>
        </Row>
      <Grid.Container
        gap={2}
        justify="center"
        alignItems="center"
        css={{ maxW: 800, marginTop: 100 }}
      >
        <Grid xs={12} md={6} justify="center">
          <LinkCard
            url="https://nextjs.org/docs"
            title="Documentation"
            text="Find in-depth information about Next.js features and API."
          />
        </Grid>
        <Grid xs={12} md={6} justify="center">
          <LinkCard
            url="https://nextjs.org/learn"
            title="Learn"
            text="Learn about Next.js in an interactive course with quizzes!"
          />
        </Grid>
        <Grid xs={12} md={6} justify="center">
          <LinkCard
            url="https://github.com/vercel/next.js/tree/canary/exampless"
            title="Examples"
            text="Discover and deploy boilerplate example Next.js projects."
          />
        </Grid>
        <Grid xs={12} md={6} justify="center">
          <LinkCard
            url="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            title="Deploy"
            text="Instantly deploy your Next.js site to a public URL with Vercel."
          />
        </Grid>
      </Grid.Container>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}


export default Home
