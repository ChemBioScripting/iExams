import React from 'react';

import { Card } from 'antd';

const DashboardCard = (props: any) => {
  const styles: any = {
    cardContent: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    contentLeft: {
      paddingLeft: '12px',
    },
    contentTitle: {
      lineHeight: '18px',
    },
    contentText: {
      fontSize: '24px',
      fontWeight: 700,
    },
    contentRight: {
      marginLeft: 'auto',
      paddingRight: '12px',
    },
    contentIcon: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      padding: '5px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };

  return (
    <div className='dashboard-card'>
      <Card>
        <div style={styles.cardContent}>
          <div style={styles.contentLeft}>
            <div style={styles.contentTitle}>{props.title}</div>
            <div style={styles.contentText}>{props.text}</div>
          </div>
          <div style={styles.contentRight}>
            <div style={styles.contentIcon}>{props.icon}</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DashboardCard;
