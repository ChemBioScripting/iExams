import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import ExamsCard from '../../components/Exams/ExamsCard';

import http from '@/plugins/http/http';
import ExamsSkeleton from '@/components/Exams/ExamsSkeleton';
import { useBoolean } from 'ahooks';

interface completedType {
  examsName: string;
  startTime: string;
  endTime: string;
  timer: number;
  aCount: number;
  bCount: number;
  cCount: number;
  dCount: number;
  eCount: number;
}

interface unfinishedType extends completedType {
  examsId: number;
}

const ExamsList = () => {
  const [skeletonShow, { toggle, setTrue, setFalse }] = useBoolean(true);

  const [unfinished, setUnfinished] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    http.getExams().then(res => {
      console.log(res.data);
      console.log(res.data);
      setUnfinished(res.data.examsInfoList);
      setCompleted(res.data.completedExamsInfoList);
      setFalse();
    });
  }, []);

  return (
    <div id='exams-list'>
      <div style={skeletonShow ? { display: 'block' } : { display: 'none' }}>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <ExamsSkeleton />
          </Col>
          <Col span={8}>
            <ExamsSkeleton />
          </Col>
          <Col span={8}>
            <ExamsSkeleton />
          </Col>
          <Col span={8}>
            <ExamsSkeleton />
          </Col>
          <Col span={8}>
            <ExamsSkeleton />
          </Col>
          <Col span={8}>
            <ExamsSkeleton />
          </Col>
          <Col span={8}>
            <ExamsSkeleton />
          </Col>
          <Col span={8}>
            <ExamsSkeleton />
          </Col>
          <Col span={8}>
            <ExamsSkeleton />
          </Col>
          <Col span={8}>
            <ExamsSkeleton />
          </Col>
          <Col span={8}>
            <ExamsSkeleton />
          </Col>
          <Col span={8}>
            <ExamsSkeleton />
          </Col>
          <Col span={8}>
            <ExamsSkeleton />
          </Col>
          <Col span={8}>
            <ExamsSkeleton />
          </Col>
          <Col span={8}>
            <ExamsSkeleton />
          </Col>
          <Col span={8}>
            <ExamsSkeleton />
          </Col>
          <Col span={8}>
            <ExamsSkeleton />
          </Col>
          <Col span={8}>
            <ExamsSkeleton />
          </Col>
        </Row>
      </div>

      <Row gutter={[16, 16]}>
        {unfinished.map((item: unfinishedType, index) => {
          return (
            <Col span={8} key={index}>
              <ExamsCard
                examsId={item.examsId}
                title={item.examsName}
                startTime={item.startTime}
                endTime={item.endTime}
                examsTimeLong={item.timer}
                examsSingleChoice={item.aCount}
                examsMultipleChoice={item.bCount}
                examsTrueFalse={item.cCount}
                examsFillInTheBlanks={item.dCount}
                examsShortAnswerQuestions={item.eCount}
              />
            </Col>
          );
        })}
      </Row>

      <Row gutter={[16, 16]}>
        {completed.map((item: completedType, index) => {
          return (
            <Col span={8} key={index}>
              <ExamsCard
                examsId={1}
                title={item.examsName}
                startTime={new Date(item.startTime).toLocaleString()}
                endTime={new Date(item.endTime).toLocaleString()}
                examsTimeLong={item.timer}
                examsSingleChoice={item.aCount}
                examsMultipleChoice={item.bCount}
                examsTrueFalse={item.cCount}
                examsFillInTheBlanks={item.dCount}
                examsShortAnswerQuestions={item.eCount}
                completed={true}
              />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default ExamsList;
