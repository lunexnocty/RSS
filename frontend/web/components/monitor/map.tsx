import { useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 90%;
  height: 15rem;
  margin: 1rem auto;
`;

type MapProps = {
  coordinate: [number, number];
};

export default function Map({ coordinate }: MapProps) {
  if (!coordinate) {
    return <></>;
  }
  console.log(coordinate);
  useEffect(() => {
    // @ts-ignore
    window.onLoad = function() {
      // @ts-ignore
      let map = new AMap.Map("container", {
        resizeEnable: true,
        zoom: 11,
        center: [121.5036,31.2974] //coordinate, //中心点坐标
      });
      // @ts-ignore
      let marker = new AMap.Marker({
        // @ts-ignore
        position: new AMap.LngLat(121.5036,31.2974),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: 'Source'
    });

      map.add(marker);
    };
    const url =
      "https://webapi.amap.com/maps?v=1.4.14&key=0cd43875027be08556166c4e3734616c&callback=onLoad";
    const jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  });
  return (
    <>
      <Container id="container" />
    </>
  );
}
