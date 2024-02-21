import React from 'react'
import { Progress } from 'antd';

type IProps = {
  percent: number;
}

export default function ProgressBar({percent}: IProps) {
    const twoColors = { '0%': '#7D4F50', '100%': '#32715A' };

  return (
    <Progress type="circle" percent={percent} strokeColor={twoColors} />
  )
}

  
