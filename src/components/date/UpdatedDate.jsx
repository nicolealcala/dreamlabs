"use client";
import { useState, useEffect } from "react";

const UpdatedDate = ({ utcDate, options }) => {
  const [localDate, setLocalDate] = useState(null);

  useEffect(() => {
    const convertToLocale = () => {
      if (utcDate instanceof Date) {
        const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
          utcDate
        );
        setLocalDate(formattedDate);
      } else {
        const date = new Date(utcDate);
        const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
          date
        );
        setLocalDate(formattedDate);
      }
    };

    convertToLocale();
  }, [utcDate, options]);

  return <span>{localDate}</span>;
};

export default UpdatedDate;
