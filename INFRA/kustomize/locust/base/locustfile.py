from locust import HttpUser, task, between

class WebsiteUser(HttpUser):
    wait_time = between(1, 5)

    @task(5)
    def index(self):
        self.client.get("/", headers={"Host": "portfolio.local"})

    @task(2)
    def stats(self):
        self.client.get("/api/stats", headers={"Host": "portfolio.local"})

    @task(1)
    def stress(self):
        self.client.post("/api/stress?duration=10", headers={"Host": "portfolio.local"})
