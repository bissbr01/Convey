import Image from "next/image"

export default function TestImg() {
  return (
    <div>
      <Image src="/portraits/thumbnail_000b5abf3e24a9766866e1d2af1f8c27f8173f37.jpg" alt="test img" width={200} height={200} />
    </div>
  )
}