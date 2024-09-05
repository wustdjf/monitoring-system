import { useEffect } from 'react';
import { Leafer, Rect } from 'leafer-ui';
import styles from './index.module.less';

export default function App() {
  useEffect(() => {
    const leafer = new Leafer({ view: 'leafer-view' });

    const rect = new Rect({
      x: 100,
      y: 100,
      width: 200,
      height: 200,
      fill: '#32cd79',
      cornerRadius: [50, 80, 0, 80],
      draggable: true
    });

    leafer.add(rect);

    return () => {
      leafer.destroy(); // 开发环境useEffect会执行2次，必须及时销毁
    };
  });

  return <div id="leafer-view" className={styles.leaferView} />;
}
