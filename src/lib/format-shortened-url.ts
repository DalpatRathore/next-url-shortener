export const formatShortenedUrl = (code:string)=>{
 return `${process.env.NEXT_PUBLIC_BASE_URL}/${code}`;
}