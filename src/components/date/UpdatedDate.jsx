"use client";
import { useState, useEffect } from "react";

const UpdatedDate = ({ utcDate, options }) => {
  const [localDate, setLocalDate] = useState(null);

  useEffect(() => {
    const convertToLocale = () => {
      const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
        utcDate
      );
      setLocalDate(formattedDate);
    };

    convertToLocale();
  }, [utcDate, options]);

  return <span>{localDate}</span>;
};

export default UpdatedDate;
