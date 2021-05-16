import React from 'react';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: '响应式',
    imageUrl: 'img/undraw_video_upload_3d4u.svg',
    description: (
      <>
        支持手机、平板、桌面电脑，并且可以自定义任意多个断点，不仅仅是兼容移动端。
      </>
    ),
  },
  {
    title: '可定制',
    imageUrl: 'img/undraw_design_components_9vy6.svg',
    description: (
      <>
        可轻松配置控制条、上下文菜单、设置和定制主题，并提供了内置组件方便二次开发。
      </>
    ),
  },
  {
    title: '多功能',
    imageUrl: 'img/undraw_functions_egi3.svg',
    description: (
      <>
        弹幕、全屏、网页全屏、快捷键、画中画、隔空播放、速度控制、上下文菜单、视频缩略图、国际化等等。
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      <div className={styles.featureImgContainer}>
        <img className={styles.featureImage} src={imgUrl} alt={title} />
      </div>
      <h3 className="my-2">{title}</h3>
      <p>{description}</p>
    </div>
  );
}

const Features = () => {

  return (
    <div className={styles.Container}>
      <div className={styles.Content}>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              {features.map((props, idx) => (
                <Feature key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Features;
