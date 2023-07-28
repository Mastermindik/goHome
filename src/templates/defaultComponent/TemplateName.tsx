import React from 'react';
import styles from './TemplateName.module.scss';

type TemplateNameProps = {

}

const TemplateName: React.FC<TemplateNameProps> = ({ }) => {
  return <div className={styles.template_name}>
    TemplateName Component
  </div>
};

export default TemplateName;
