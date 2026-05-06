import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge, ListGroup } from 'react-bootstrap';
import { useLanguage } from '../../context/LanguageContext';

interface Pod {
    name: string;
    status: string;
    ip: string;
}

interface Stats {
    replicas: number;
    ready_replicas: number;
    pods: Pod[];
}

const K8sDashboard: React.FC = () => {
    const { t } = useLanguage();
    const [stats, setStats] = useState<Stats | null>(null);
    const [targetReplicas, setTargetReplicas] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchStats = async () => {
        try {
            const response = await fetch('/api/stats');
            const data = await response.json();
            setStats(data);
            setTargetReplicas(data.replicas);
        } catch (error) {
            console.error("Error fetching stats:", error);
        }
    };

    useEffect(() => {
        fetchStats();
        const interval = setInterval(fetchStats, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleScale = async () => {
        setLoading(true);
        try {
            await fetch(`/api/scale?replicas=${targetReplicas}`, { method: 'POST' });
            fetchStats();
        } catch (error) {
            console.error("Scaling error:", error);
        }
        setLoading(false);
    };

    const handleKillPod = async (podName: string) => {
        try {
            await fetch(`/api/pods/${podName}`, { method: 'DELETE' });
            fetchStats();
        } catch (error) {
            console.error("Kill pod error:", error);
        }
    };

    const handleStress = async () => {
        try {
            await fetch('/api/stress?duration=30', { method: 'POST' });
        } catch (error) {
            console.error("Stress test error:", error);
        }
    };

    if (!stats) return <Container className="py-5 text-center">{t('playground.loading')}</Container>;

    return (
        <section className="py-5 bg-light" id="playground">
            <Container>
                <div className="text-center mb-4">
                    <h2 className="mb-3">{t('playground.title')}</h2>
                    <img src="https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=800&q=80" alt={t('playground.alt')} className="img-fluid rounded shadow-sm" style={{ maxHeight: '200px', objectFit: 'cover', width: '100%' }} />
                </div>
                <Row className="mb-4">
                    <Col md={6}>
                        <Card>
                            <Card.Header>{t('playground.control.title')}</Card.Header>
                            <Card.Body>
                                <Card.Title>{t('playground.control.scale')}</Card.Title>
                                <Form.Group className="mb-3">
                                    <Form.Label>{t('playground.control.target')}: {targetReplicas}</Form.Label>
                                    <Form.Range 
                                        min="1" 
                                        max="10" 
                                        value={targetReplicas} 
                                        onChange={(e) => setTargetReplicas(parseInt(e.target.value))} 
                                    />
                                </Form.Group>
                                <Button variant="primary" onClick={handleScale} disabled={loading}>
                                    {loading ? t('playground.control.scaling') : t('playground.control.apply')}
                                </Button>
                                <Button variant="danger" className="ms-2" onClick={handleStress}>
                                    {t('playground.control.stress')}
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card>
                            <Card.Header>{t('playground.health.title')}</Card.Header>
                            <Card.Body>
                                <Row className="text-center">
                                    <Col>
                                        <h3>{stats.replicas}</h3>
                                        <p>{t('playground.health.desired')}</p>
                                    </Col>
                                    <Col>
                                        <h3 className="text-success">{stats.ready_replicas}</h3>
                                        <p>{t('playground.health.ready')}</p>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>{t('playground.pods.title')}</Card.Header>
                            <ListGroup variant="flush">
                                {stats.pods.map((pod) => (
                                    <ListGroup.Item key={pod.name} className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <strong>{pod.name}</strong> <Badge bg={pod.status === 'Running' ? 'success' : 'warning'} className="ms-2">{pod.status}</Badge>
                                            <div className="small text-muted">{pod.ip}</div>
                                        </div>
                                        <Button variant="outline-danger" size="sm" onClick={() => handleKillPod(pod.name)}>
                                            {t('playground.pods.kill')}
                                        </Button>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>

                {/* Grafana Dashboard Iframe */}
                <Row className="mt-4">
                    <Col>
                        <Card className="border-0 shadow-sm">
                            <Card.Header className="bg-dark text-white fw-bold">
                                Real-time Metrics (Grafana)
                            </Card.Header>
                            <Card.Body className="p-0">
                                <iframe
                                    src="http://localhost:3000/d/portfolio-signals/portfolio-backend-golden-signals?orgId=1&refresh=5s&kiosk"
                                    width="100%"
                                    height="600px"
                                    frameBorder="0"
                                    title="Grafana Dashboard"
                                ></iframe>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default K8sDashboard;
