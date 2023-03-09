import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { UserData } from '../Ticket/hooks/use-conf-data'
import { useMobileViewport } from '../../../hooks/useMobileViewport'

interface Props {
  users: UserData[]
  reverse?: boolean
  xOffset?: number
}

export function TicketBrickWallRow({ users, reverse, xOffset = 250 }: Props) {
  const ref = useRef(null)
  const isMobile = useMobileViewport(768)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const STORAGE_URL = 'https://obuldanrptloktxcffvn.supabase.co/storage/v1/object/public/images/lw7'
  const getOgUrl = (username: string, isGold: boolean) =>
    isGold
      ? `${STORAGE_URL}/tickets/golden/${username}.png`
      : `${STORAGE_URL}/tickets/${username}.png`

  const x = useTransform(scrollYProgress, [0, 1], reverse ? [-xOffset, 0] : [0, -xOffset])

  return (
    <div ref={ref} className="relative h-[125px] md:h-[250px] w-full m-0 overflow-hidden py-2.5">
      <div className="absolute flex h-fit w-fit">
        <motion.div className="flex gap-2.5 md:gap-5 will-change-transform" style={{ x }}>
          {users.map((user, i) => (
            <Link href={`/launch-week/tickets/${user.username}`} key={user.username}>
              <a className="relative w-[230px] md:w-[450px] rounded-lg md:rounded-2xl overflow-hidden transform scale-100 md:hover:scale-[101%] transition-transform">
                <div className="relative inset-0 w-full pt-[50%] transform scale-[120%]">
                  <span className="absolute inset-0 flex items-center justify-center text-white">
                    {user.username}
                  </span>
                  <Image
                    src={getOgUrl(user.username!, !!user.golden)}
                    alt={user.username}
                    layout="fill"
                    objectFit="cover"
                    objectPosition={isMobile ? 'top 50% right 2px' : 'top 50% right 5px'}
                    placeholder="blur"
                    blurDataURL="/images/blur.png"
                  />
                </div>
              </a>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
