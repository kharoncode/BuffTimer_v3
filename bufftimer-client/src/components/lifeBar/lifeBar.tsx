import styled from 'styled-components';

type life = {
   life: {
      currentLife: number;
      maxLife: number;
   };
};

const LifeElt = styled.div<{ $stop: string; color: string }>`
   font-weight: 500;
   display: flex;
   justify-content: center;
   align-items: center;
   color: black;
   border: solid 1px black;
   border-radius: 10px;
   width: 90%;
   height: 25px;
   background-image: linear-gradient(
      90deg,
      ${({ color }) => color} ${({ $stop }) => $stop}%,
      rgb(230, 230, 230) ${({ $stop }) => $stop}%,
      rgb(230, 230, 230) 100%
   );
   @media screen and (max-width: 700px) {
      font-size: 1.2em;
   }
`;

export default function LifeBar(life: life) {
   const lifeInfo = life.life;
   const stop = Math.round((lifeInfo.currentLife / lifeInfo.maxLife) * 100);
   const color =
      stop < 20
         ? 'rgb(255, 60, 55)'
         : stop < 40
         ? 'rgb(255, 116, 0)'
         : stop < 60
         ? 'rgb(255, 198, 0)'
         : stop < 80
         ? 'rgb(167, 191, 0)'
         : 'rgba(102, 255, 87, 1)';

   return (
      <LifeElt $stop={stop.toString()} color={color}>
         {lifeInfo.currentLife}/{lifeInfo.maxLife}
      </LifeElt>
   );
}
