import { Box, chakra } from "@chakra-ui/react";
import NextImage from "next/image";
import { useMemo } from "react";
import useDimensions from "react-cool-dimensions";
import { isBrowser } from "utils/isBrowser";

const ChakraNextUnwrappedImage = chakra(NextImage, {
  shouldForwardProp: (prop) =>
    [
      "width",
      "height",
      "src",
      "alt",
      "quality",
      "placeholder",
      "blurDataURL",
      "loader ",
      "layout",
      "sizes",
      "onLoadingComplete",
      "priority",
    ].includes(prop),
});

const previousLoadedImagesSet = new Set();

export const ChakraNextImage = (props) => {
  const {
    src,
    alt,
    width,
    quality = 90,
    height,
    layout = "responsive",
    objectFit,
    objectPosition,
    placeholder = typeof src === "string" ? "empty" : "blur",
    imgProps,
    priority,
    sizes,
    ...rest
  } = props;
  const { observe, width: _width } = useDimensions();
  const imageId = useMemo(() => {
    const _src =
      typeof src === "string" ? src : src?.default?.src || src?.src || "";
    return `${_src}_w=${_width}`;
  }, [_width, src]);

  const size =
    sizes ||
    (isBrowser() && _width !== undefined
      ? `${(_width / window.innerWidth) * 100}vw`
      : "100vw");
  return (
    <Box maxW="100%" pos="relative" {...rest} ref={observe}>
      <ChakraNextUnwrappedImage
        onLoadingComplete={() => {
          previousLoadedImagesSet.add(imageId);
        }}
        objectFit={objectFit}
        objectPosition={objectPosition}
        w="auto"
        h="auto"
        layout={layout}
        sizes={size}
        width={width}
        quality={quality}
        height={height}
        placeholder={placeholder}
        src={src}
        alt={alt}
        priority={priority}
        transition={
          previousLoadedImagesSet.has(imageId) ? undefined : "all 0.2s"
        }
        {...imgProps}
      />
    </Box>
  );
};