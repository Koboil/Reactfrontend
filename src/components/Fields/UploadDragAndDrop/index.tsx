/*jsxImportSource @emotion/react */
import { LockOutlined } from '@ant-design/icons';
//import { css } from '@emotion/react';
import { faFileArrowUp } from '@fortawesome/free-solid-svg-icons/faFileArrowUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { UploadListType } from 'antd/lib/upload/interface';
import { ReactNode, useCallback, useEffect } from 'react';
import { titles } from '@/utils';
 import styled, { css } from 'styled-components';

interface UploadDragAndDropProps {
   defaultValue?: any;
   value?: any;
   onChange?: (data: any) => void;
   readOnly?: boolean;
   hide?: boolean;
   text?: ReactNode | string;
   className?: string;
   config: object;
   height?: number;
   name?: string;
   listType?: UploadListType;
   maxCount?: number;
   extra?: ReactNode;
   disabled?: boolean;
   multiple?: boolean;
   subtitle?: string;
   fileList?: any;
   setFileList?: (list: any) => void;
   uploadKey?: any;
   restrictedFields?: string;
   id?: string;
}

interface UploadWrapperProps {
   hide: boolean;
   disabled: boolean;
   filesCount: number;
   maxFile: boolean;
}

const UploadDragAndDrop = ({
   hide = false,
   text,
   config,
   name,
   className,
   listType = 'text',
   maxCount = 1,
   height = HEIGHT,
   disabled = false,
   extra,
   multiple,
   subtitle,
   setFileList,
   uploadKey,
   restrictedFields,
   id,
   ...props
}: UploadDragAndDropProps) => {
 
   const filesCount = props['fileList']?.length || 0;
   const fileList = props['fileList'];
   const isRestricted = restrictedFields?.includes(id || '');

   const newSetFileList = useCallback(() => {
      setFileList &&
         setFileLis(prev: any) => ({
            ...prev,
            [uploadKey]: fileList,
         }));
   }, [fileList, uploadKey, setFileList]);

   /*
                                              Disabled eslint line because it requires the setState hook(newSetFileList) as array dependency of the useEffect hook, but adding that will cause an infinit loop
                                              From react doc: React guarantees that setState function identity is stable and won’t change on re-renders. This is why it’s safe to omit from the useEffect or useCallback dependency list.
                                              We ommit that dependency so we need to tell eslint to skip the line
                                            */
   useEffec() => {
      newSetFileLis);
   }, [fileList]); //eslint-disable-line

   const rowCount =
      filesCount === 0
         ? 1
         : filesCount % 2 === 0
           ? Math.floor(filesCount / 2)
           : Math.floor(filesCount / 2) + 1;

   const realHeight = HEIGHT * rowCount;

   const customIconStyle =
      filesCount === 0
         ? { fontSize: '21px', marginRight: '10px' }
         : { fontSize: '15px', marginRight: '3px' };

   if (!isRestricted && (hide || disabled) && filesCount === 0)
      return (
         <p className="text-gray-400 my-auto mx-auto h-[150px] flex justify-center items-center">
            <i>{'Pas de fichier'}</i>
         </p>
      );

   return (
      <UploadWrapper
         filesCount={filesCount as number}
         hide={hide}
         disabled={disabled}
         maxFile={filesCount === maxCount}
      >
         <Dragger
            height={height > realHeight ? height : realHeight}
            listType={listType}
            name={name}
            {...config}
            {...props}
            multiple={multiple}
            maxCount={maxCount}
            disabled={isRestricted || hide || disabled}
            openFileDialogOnClick={!(hide || disabled)}
            className={`notransition border-dashed border-2 rounded-md border-[#d9d9d9] flex items-center ${className}`}
            showUploadList={!isRestricted}
         >
            {isRestricted && (
               <Tooltip title={titles.messages.fieldRestricted}>
                  <div className="w-full h-full">
                     <LockOutlined className="w-3" />
                  </div>
               </Tooltip>
            )}
            {!isRestricted && !hide && filesCount < maxCount && !disabled && (
               <div className="ant-upload-text">
                  <p>
                     <FontAwesomeIcon
                        icon={faFileArrowUp}
                        style={{ color: '#7c98b6', ...customIconStyle }}
                        size="lg"
                     />
                     {text || (
                        <>
                           {'Glisser et déposer ici ou'}{' '}
                           <strong>{' choisir un fichier'}</strong>
                        </>
                     )}
                     {extra && extra}
                     {maxCount > 1 && (
                        <span className="block text-gray-400 text-xs">
                           {subtitle ? subtitle : '{count} documents autorisés '}
                        </span>
                     )}
                  </p>
               </div>
            )}
         </Dragger>
      </UploadWrapper>
   );
};

export default UploadDragAndDrop;

const getStyles = ({
   filesCount,
   hide,
   disabled,
   maxFile,
}: {
   hide: boolean;
   disabled: boolean;
   filesCount: number;
   maxFile: boolean;
}) => css`
   .ant-upload-list-picture .ant-upload-list-item,
   .ant-upload-list-text .ant-upload-list-item,
   .ant-upload-list-picture-card .ant-upload-list-item,
   .ant-upload-list-text-card .ant-upload-list-item,
   .cd-upload-list-picture .cd-upload-list-item,
   .cd-upload-list-text .cd-upload-list-item,
   .cd-upload-list-picture-card .cd-upload-list-item,
   .cd-upload-list-text-card .cd-upload-list-item {
      height: 50px;
   }

   .ant-upload-list-picture .ant-upload-list-item-thumbnail img,
   .ant-upload-list-text .ant-upload-list-item-thumbnail img,
   .ant-upload-list-picture-card .ant-upload-list-item-thumbnail img,
   .ant-upload-list-text-card .ant-upload-list-item-thumbnail img,
   .cd-upload-list-picture .cd-upload-list-item-thumbnail img,
   .cd-upload-list-text .cd-upload-list-item-thumbnail img,
   .cd-upload-list-picture-card .cd-upload-list-item-thumbnail img,
   .cd-upload-list-text-card .cd-upload-list-item-thumbnail img {
      width: 48px;
      height: 40px;
   }

   .upload-extra {
      font-size: 11px;
      font-weight: 200;
      display: block;
   }

   & > span:first-of-type {
      display: flex;
   }

   .ant-upload.ant-upload-drag,
   .cd-upload.cd-upload-drag {
      background-color: #fafafa;
      border: 0px;

      justify-content: center;
      display: ${maxFile === true && filesCount > 0 ? 'none' : 'flex'};
      align-items: center;
      gap: 39px;
      flex: 1;
      justify-content: flex-start;

      &.cd-upload-disabled,
      &.ant-upload-disabled {
         color: #9ca3af;
         background-color: rgba(0, 0, 0, 0.04);

         strong {
            color: #9ca3af;
         }
      }

      .ant-upload.ant-upload-btn,
      .cd-upload.cd-upload-btn {
         padding: 0px 3px;
         height: 100%;
         width: 100%;
      }

      &.ant-upload-drag-hover,
      &.cd-upload-drag-hover {
         background: ${hide || disabled ? '' : '#e4f4ff'};
      }
   }

   .ant-upload-list-picture,
   .ant-upload-list-text,
   .ant-upload-list,
   .cd-upload-list-picture,
   .cd-upload-list-text,
   .cd-upload-list {
      display: ${filesCount === 0 ? 'none' : 'flex'};
      flex-direction: row;
      flex-wrap: nowrap;
      gap: 0px 10px;
   }

   .ant-upload-list,
   .cd-upload-list {
      width: ${hide || maxFile || disabled ? '100%' : filesCount === 0 ? '0%' : '50%'};
      height: 100%;
   }

   .cd-upload-list-picture-container
      .cd-upload-animate-leave
      .cd-upload-animate-leave-active
      .cd-upload-animate,
   .cd-upload-animate-appear .cd-upload-animate-appear-active .cd-upload-animate {
      -webkit-transition: none !important;
      -moz-transition: none !important;
      -o-transition: none !important;
      transition: none !important;
      display: none !important;
   }

   .ant-upload-list-picture-container,
   .ant-upload-list-text-container,
   .cd-upload-list-picture-container,
   .cd-upload-list-text-container {
      border: 1px solid #d9d9d9;
      border-radius: 8px;
      padding: 0px 4px;
      margin: 4px 0px;

      .ant-upload-list-item-thumbnail,
      .ant-upload-list-item-name,
      .ant-upload-list-item-card-actions,
      .cd-upload-list-item-thumbnail,
      .cd-upload-list-item-name,
      .cd-upload-list-item-card-actions,
      .cd-upload-list-item-image,
      .cd-upload-list-item-info,
      .cd-upload-list-item-card-actions-btn {
         z-index: 10;
      }

      .ant-upload-list-item-card-actions-btn,
      .cd-upload-list-item-card-actions-btn {
         opacity: 1;
      }

      .ant-upload-list-item-thumbnail,
      .cd-upload-list-item-thumbnail {
         height: 100%;
         display: flex;
      }

      .ant-upload-list-item-image,
      .cd-upload-list-item-image {
         width: auto;
         margin: 0;
         margin-top: 0px !important;
         object-fit: cover;
      }

      .ant-upload-list-item-name,
      .cd-upload-list-item-name {
         padding: 0px;
         padding-left: 3px;
      }
   }

   .ant-upload-text,
   .cd-upload-text {
      font-size: ${filesCount > 0 ? '13px' : '14px'};
      line-height: ${filesCount > 0 ? '1.21' : '1.5715'};
      width: 100%;

      // strong {
      //    color: $primaryColor};
      // }
   }

   .ant-upload-list::before,
   .ant-upload-list::after,
   .cd-upload-list::before,
   .cd-upload-list::after {
      display: none;
   }

   .ant-upload-list-item-list-type-picture,
   .ant-upload-list-item-list-type-text,
   .cd-upload-list-item-list-type-picture,
   .cd-upload-list-item-list-type-text {
      height: 42px !important;
      width: 100%;
      display: flex;
      align-items: center;
   }

   .ant-upload-list-text .ant-upload-span,
   .cd-upload-list-text .cd-upload-span {
      max-width: 100%;
   }

   .ant-upload-list-text .ant-upload-list-item-name,
   .cd-upload-list-text .cd-upload-list-item-name {
      padding-right: 0px;
   }

   .cd-upload-list-item-name {
      white-space: nowrap;
      width: 100%;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
   }

   @media only screen and (max-width: 1650px) {
      .cd-upload-list-item-name {
         width: 50px;
      }
   }

   .cd-upload-list-item-info {
      width: 100%;
      display: flex;
      align-items: center;
   }

   .cd-upload-span {
      flex: 1 1 0%;
      display: flex;
      align-items: center;
      justify-content: space-between;
   }

   .cd-upload-list-item-container {
      margin: 2px;
      flex-grow: 1;
      flex-shrink: 1;
      word-wrap: anywhere;
      word-break: break-all;
      overflow: hidden;
      width: ${filesCount >= 2 && `calc(100% / ${filesCount}) `};
   }

   .cd-upload-wrapper .cd-upload-list.cd-upload-list-picture .cd-upload-list-item,
   .cd-upload-wrapper .cd-upload-list.cd-upload-list-picture-card .cd-upload-list-item {
      position: relative;
      margin-top: 0px;
      height: 100%;
      padding: 8px;
      justify-content: space-between;
   }

   .cd-upload-wrapper
      .cd-upload-list.cd-upload-list-picture
      .cd-upload-list-item
      .cd-upload-list-item-thumbnail
      img,
   .cd-upload-wrapper
      .cd-upload-list.cd-upload-list-picture-card
      .cd-upload-list-item
      .cd-upload-list-item-thumbnail
      img {
      width: 48px;
      height: 40px;
      margin-top: 4px;
   }

   .cd-upload-list-text .cd-upload-list-item,
   .cd-upload-list-picture-card .cd-upload-list-item,
   .cd-upload-list-text-card .cd-upload-list-item {
      height: 50px;
      margin-top: auto;
      justify-content: center;
   }
`;
// Create styled components
const UploadWrapper = styled.div<UploadWrapperProps>`
   ${(props) => getStyles(props)}
`;

const HEIGHT = 60;
