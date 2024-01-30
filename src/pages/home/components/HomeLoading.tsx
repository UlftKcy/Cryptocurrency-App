import { Flex, Skeleton } from "antd";

export default function HomeLoading() {
  return (
    <Flex vertical gap={'middle'}>
      <Skeleton paragraph={{ rows: 1 }} />
      <Skeleton active avatar />
      <Skeleton active avatar />
      <Skeleton active avatar />
      <Skeleton active avatar />
      <Skeleton active avatar />
      <Skeleton active avatar />
    </Flex>
  )
}