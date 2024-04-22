import { Fragment } from 'react';
import { useImageInPainting } from '../context/image-inpainting';
import QuickSelectImageBox from './quick-select-image-box';
import { useMemo } from 'react';

const QuickSelectImage = () => {
  const { imageHistory } = useImageInPainting();
  const fakeAssets = useMemo(() => {
    const tmp = [];
    for (let i = 0; i < 100; i++) {
      tmp.push(
        `https://placehold.co/420x280/${i % 2 ? 'red' : 'blue'}/white?text=${i}`
      );
    }
    return tmp;
  }, []);
  return (
    <Fragment>
      {imageHistory.map((img, index) => {
        console.log(URL.createObjectURL(img));
        return (
          <Fragment key={`1_${index}`}>
            <QuickSelectImageBox file={img} isUpload={true} />
          </Fragment>
        );
      })}

      {fakeAssets.map((img, index) => {
        return (
          <Fragment key={`2_${index}`}>
            <QuickSelectImageBox file={img} isAssets={true} />
          </Fragment>
        );
      })}
    </Fragment>
  );
};
export default QuickSelectImage;