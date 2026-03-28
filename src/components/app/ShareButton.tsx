import React from "react";
import ShareMenu from "@/components/app/ShareMenu";
import { ShareCardType } from "@/lib/share-card";

interface ShareButtonProps {
  type: ShareCardType;
  data: any;
  label?: string;
  className?: string;
}

// ShareButton is now just a thin wrapper around ShareMenu
const ShareButton: React.FC<ShareButtonProps> = ({ type, data, label, className }) => {
  return <ShareMenu type={type} data={data} label={label} className={className} />;
};

export default ShareButton;
