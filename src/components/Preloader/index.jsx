import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { slideUp } from './anim'

export default function Index() {
  const [dimension, setDimension] = useState({ width: 0, height: 0 })

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight })
  }, [])

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
    },
  }

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className="h-screen w-screen flex items-center justify-center fixed z-50 bg-papoula-blue"
    >
      {dimension.width > 0 && (
        <>
          <motion.svg
            className="lg:w-[369px] lg:h-[364px] w-[200px] h-[200px]"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            viewBox="0 0 369 364"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M143.537 31.1181C158.367 22.4809 176.186 20.608 192.489 25.973L204.664 29.9799C209.938 31.7156 215.428 32.7109 220.976 32.9371L233.732 33.4573C250.934 34.1588 267.006 42.2159 277.86 55.5796L285.756 65.301C289.277 69.6357 293.386 73.4577 297.963 76.6563L308.152 83.7754C322.346 93.6934 331.563 109.26 333.435 126.475L334.756 138.63C335.362 144.209 336.748 149.674 338.873 154.868L343.493 166.159C350.061 182.212 349.361 200.321 341.573 215.819L336.062 226.787C333.547 231.792 331.745 237.125 330.709 242.629L328.426 254.764C325.232 271.735 314.881 286.506 300.02 295.301L289.166 301.725C284.376 304.56 280.004 308.048 276.175 312.088L267.44 321.306C255.625 333.774 239.032 340.58 221.865 340L209.029 339.567C203.485 339.38 197.942 339.962 192.558 341.298L180.092 344.391C163.421 348.527 145.776 345.319 131.626 335.58L121.166 328.38C116.581 325.224 111.579 322.722 106.304 320.945L94.3512 316.918C77.9868 311.405 64.7911 299.108 58.1387 283.173L53.3818 271.778C51.224 266.609 48.353 261.768 44.8524 257.395L37.1811 247.812C26.3415 234.272 21.8916 216.703 24.9786 199.636L27.1499 187.631C28.1487 182.109 28.3679 176.475 27.8011 170.892L26.5663 158.728C24.8174 141.501 30.5967 124.358 42.4187 111.705L50.9044 102.623C54.717 98.5428 57.9413 93.9501 60.4839 88.978L66.1861 77.8276C74.0247 62.4991 88.0703 51.2765 104.751 47.0138L117.12 43.8528C122.5 42.478 127.662 40.3632 132.46 37.5689L143.537 31.1181Z"
              fill="#D7DADB"
            />
            <ellipse
              cx="183.809"
              cy="184.93"
              rx="15.525"
              ry="16.11"
              fill="#1EA8FF"
            />
            <rect
              x="260.167"
              y="59.8196"
              width="63"
              height="96"
              rx="31.5"
              transform="rotate(45 260.167 59.8196)"
              fill="#1EA8FF"
            />
            <path
              d="M174.85 98.2438C184.578 112.667 180.772 132.245 166.35 141.973C151.927 151.701 132.349 147.896 122.62 133.473L104.167 106.115C94.4388 91.692 98.2444 72.1137 112.667 62.3854C127.09 52.6572 146.668 56.4628 156.396 70.8855L174.85 98.2438Z"
              fill="#1EA8FF"
            />
            <rect
              x="53.3201"
              y="238.747"
              width="63"
              height="96"
              rx="31.5"
              transform="rotate(-98 53.3201 238.747)"
              fill="#1EA8FF"
            />
            <path
              d="M237.864 245.433C222.228 237.806 215.735 218.948 223.361 203.312C230.987 187.676 249.845 181.182 265.482 188.809L295.142 203.275C310.778 210.901 317.271 229.759 309.645 245.396C302.019 261.032 283.161 267.525 267.524 259.899L237.864 245.433Z"
              fill="#1EA8FF"
            />
            <path
              d="M142.742 255.327C144.56 238.026 160.06 225.474 177.362 227.293C194.664 229.111 207.215 244.611 205.397 261.913L201.947 294.732C200.129 312.034 184.629 324.585 167.327 322.767C150.026 320.948 137.474 305.448 139.293 288.147L142.742 255.327Z"
              fill="#1EA8FF"
            />
          </motion.svg>
        </>
      )}
    </motion.div>
  )
}
