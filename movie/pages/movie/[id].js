import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

const VideoCard = () => {
  const router = useRouter();
  const { id } = router.query;

  return <p>Video: {id}</p>;
};

export default VideoCard;
