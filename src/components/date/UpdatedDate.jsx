"use client";
import { useState, useEffect } from "react";

const UpdatedDate = ({ utcDate, options }) => {
  const [localDate, setLocalDate] = useState(null);

  const optionsWithTime = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };

  const optionsWithoutTime = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };

  useEffect(() => {
    const convertToLocale = () => {
      if (options === "datetime") {
        if (utcDate instanceof Date) {
          const formattedDate = new Intl.DateTimeFormat(
            "en-US",
            optionsWithTime
          ).format(utcDate);
          setLocalDate(formattedDate);
        } else {
          const date = new Date(utcDate);
          const formattedDate = new Intl.DateTimeFormat(
            "en-US",
            optionsWithTime
          ).format(date);
          setLocalDate(formattedDate);
        }
      } else {
        if (utcDate instanceof Date) {
          const formattedDate = new Intl.DateTimeFormat(
            "en-US",
            optionsWithoutTime
          ).format(utcDate);
          setLocalDate(formattedDate);
        } else {
          const date = new Date(utcDate);
          const formattedDate = new Intl.DateTimeFormat(
            "en-US",
            optionsWithoutTime
          ).format(date);
          setLocalDate(formattedDate);
        }
      }
    };

    convertToLocale();
  }, [utcDate, options, optionsWithTime, optionsWithoutTime]);

  return <span>{localDate}</span>;
};

export default UpdatedDate;
