import { forwardRef, useEffect, useState } from "react";
import ReactCrop, { Crop } from "react-image-crop";

import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalBody,
  Image,
} from "@chakra-ui/react";

import "react-image-crop/dist/ReactCrop.css";

const ASPECT = 1;

interface ICropImageProps {
  isOpen: boolean;
  onClose: (updateImg?: boolean) => void;
  setCompletedCrop: any;
  src: any;
}

export const CropImage = forwardRef<HTMLImageElement, ICropImageProps>(
  ({ isOpen, onClose, setCompletedCrop, src }: ICropImageProps, ref) => {
    const [crop, setCrop] = useState<Crop>();
    const [cropped, setCroppped] = useState(false);

    useEffect(() => {
      setCrop(undefined);
      setCroppped(false);
    }, [isOpen]);

    return (
      <>
        <Modal isOpen={isOpen} onClose={() => onClose()}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Cortar imagem</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => {
                  setCrop(percentCrop);
                  setCroppped(true);
                }}
                aspect={ASPECT}
                onComplete={(c) => setCompletedCrop(c)}
              >
                <Image ref={ref} src={src} alt="Crop me" width="100%" />
              </ReactCrop>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="green"
                onClick={() => onClose(true)}
                pointerEvents={cropped ? "initial" : "none"}
                opacity={cropped ? 1 : 0.6}
                type="button"
              >
                Cortar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
);
