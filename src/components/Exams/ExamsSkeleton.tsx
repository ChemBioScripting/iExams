import { Card, Skeleton, Space } from 'antd';
import React from 'react';

const styles: any = {
  examsListCard: {
    marginBottom: '16px',
  },

  examsListCardA: {
    color: '#515a6e',
  },

  cardContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  contentLeft: {
    paddingLeft: '12px',
  },

  contentText: {
    paddingTop: '14px',
  },

  contentTitle: {
    fontSize: '24px',
    fontWeight: '700',
  },

  contentDetail: {
    display: 'flex',
  },

  contentRight: {
    marginLeft: 'auto',
    paddingRight: '12px',
  },

  contentImages: {
    width: '74px',
    height: '74px',
    padding: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  contentImagesImg: {
    width: '74px',
    height: '74px',
    borderRadius: '50%',
  },

  examsCard: {
    cursor: 'pointer',
  },
};

const ExamsSkeleton = () => {
  return (
    <div id='exams-skeleton'>
      <Card>
        <div style={styles.cardContent}>
          <div style={styles.contentLeft}>
            <div>
              <div style={styles.contentTitle}>
                <Skeleton.Input style={{ width: 300 }} active />
              </div>
              <div style={styles.contentText}>
                <div id='content-time'>
                  <Skeleton.Input style={{ width: 200, height: 15 }} active />
                  <br />
                  <Skeleton.Input style={{ width: 200, height: 15 }} active />
                </div>
              </div>
            </div>
          </div>
          <div style={styles.contentRight}>
            <div style={styles.contentImages}>
              <Skeleton.Avatar
                active
                shape='circle'
                style={styles.contentImagesImg}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ExamsSkeleton;
