import React, { useEffect, useState } from 'react';

import { Grid, Timeline } from '@arco-design/web-react';
import style from './index.module.less';

import { getWorkplace } from '@/api/workplace';
import useLocale from '@/utils/useLocale';

const { Row, Col } = Grid;
const TimelineItem = Timeline.Item;

export default function WorkplaceCompontent() {
  const [loading, setLoading] = useState(true);
  const t = useLocale();

  const onGetWorkplace = () => {};

  useEffect(() => {}, []);

  return <div>仪表图</div>;
}
