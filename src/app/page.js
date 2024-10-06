import { useQuery } from '@tanstack/react-query';
import axios from "axios";

export default function Home() {
  const fetchPosts = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`
    );
    return data;
  };

  // No need to extract queryClient, just use useQuery
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <div>Loading....</div>;
  if (isError) return <div>Error... {error.message}</div>;

  return (
    <div>
     
    </div>
  );
}