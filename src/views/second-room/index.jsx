import { useEffect } from 'react';
import { Leafer, Box, Ellipse, Line, Rect } from 'leafer-ui';
import styles from './index.module.less';
import { roomList } from '@/views/second-room/room';
import store from '@/store';

export default function App() {
  const { collapsed } = store.getState().menuReducer;
  console.log('routers', collapsed);

  useEffect(() => {
    const leafer = new Leafer({ view: 'leafer-view' });

    // 绘制房间外墙
    const rectRoom = new Rect({
      x: 90,
      y: 90,
      width: 1320,
      height: 800,
      fill: '#ffffff',
      cornerRadius: 0,
      strokeWidth: 1,
      stroke: 'black'
    });
    leafer.add(rectRoom);

    // 绘制房间
    roomList.forEach((room) => {
      const box = new Box({
        x: room.loc.x,
        y: room.loc.y,
        width: room.loc.width,
        height: room.loc.height,
        fill: '#FFFFFF',
        strokeWidth: 1,
        stroke: 'black',
        children: [
          {
            tag: 'Text',
            text: room.name,
            fill: 'black',
            padding: [10, 20],
            textAlign: 'left',
            verticalAlign: 'top'
          },
          {
            tag: 'Text',
            text: room.number,
            fill: 'black',
            padding: [30, 20],
            textAlign: 'left',
            verticalAlign: 'top'
          },
          {
            tag: 'Text',
            text: `温度：${room.data.temperature}℃`,
            fill: 'black',
            padding: [50, 20]
          },
          {
            tag: 'Text',
            text: `湿度：${room.data.humidity}%`,
            fill: 'black',
            padding: [70, 20]
          }
        ]
      });

      leafer.add(box);
    });

    // 中间文案
    const centerBox = new Box({
      x: 560,
      y: 460,
      width: 200,
      height: 200,
      fill: '#FFFFFF',
      children: [
        {
          tag: 'Text',
          text: '稳定性实验室',
          fill: 'black',
          fontSize: 20,
          padding: [10, 20],
          textAlign: 'left',
          verticalAlign: 'top'
        },
        {
          tag: 'Text',
          text: 'Stability Laboratory Room',
          fill: 'black',
          fontSize: 16,
          padding: [35, 20],
          textAlign: 'left',
          verticalAlign: 'top'
        },
        {
          tag: 'Text',
          text: '02-230',
          fill: 'black',
          fontSize: 14,
          padding: [55, 20],
          textAlign: 'left',
          verticalAlign: 'top'
        }
      ]
    });
    leafer.add(centerBox);

    // 绘制大门
    const lineGate = new Line({
      points: [540, 770, 540, 890, 780, 890, 780, 770],
      strokeWidth: 1,
      stroke: 'black'
    });
    leafer.add(lineGate);
    const leftGate = new Ellipse({
      x: 420,
      y: 770,
      width: 240,
      height: 240,
      startAngle: -90,
      endAngle: 0,
      innerRadius: 1,
      stroke: 'black',
      strokeWidth: 1,
      strokeAlign: 'center',
      strokeCap: 'round'
    });
    leafer.add(leftGate);
    const rightGate = new Ellipse({
      x: 660,
      y: 770,
      width: 240,
      height: 240,
      startAngle: -180,
      endAngle: -90,
      innerRadius: 1,
      stroke: 'black',
      strokeWidth: 1,
      strokeAlign: 'center',
      strokeCap: 'round'
    });
    leafer.add(rightGate);

    return () => {
      leafer.destroy(); // 开发环境useEffect会执行2次，必须及时销毁
    };
  });

  return <div id="leafer-view" className={styles.leaferView} />;
}
