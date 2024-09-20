const DATE_TIME_FOMATTER = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  
  export const formatDateTime = (date: Date ) => {

    const newDate = new Date(date);
    return DATE_TIME_FOMATTER.format(newDate);
  };

  export const formatShortenedUrl = (code:string)=>{
    return `${process.env.NEXT_PUBLIC_BASE_URL}/${code}`;
   }