"use client";
import { useState, useEffect } from "react";
import { options } from "@/lib/utils";

const UpdatedDate = ({ utcDate }) => {
  const [localDate, setLocalDate] = useState(null);

  useEffect(() => {
    const convertToLocale = () => {
      const date = new Date(utcDate);
      const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
        date
      );
      setLocalDate(formattedDate);
    };

    convertToLocale();
  }, [utcDate]);

  return <span>{localDate}</span>;
};

export default UpdatedDate;
