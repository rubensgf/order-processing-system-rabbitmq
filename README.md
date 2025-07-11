# 🚀 Sistema de Processamento de Pedidos com RabbitMQ

O objetivo deste projeto é simular uma arquitetura **escalável**, **desacoplada** e **orientada a eventos**, com múltiplos microserviços se comunicando via filas assíncronas, utilizando **Node.js**, **RabbitMQ**, **Docker** e **MySQL**.

O sistema utiliza o **Pino** para registrar logs estruturados em JSON, permitindo futuras integrações com ferramentas de monitoramento e observabilidade como Grafana Loki ou Datadog.

---

## 📦 Microsserviços

- **`order-service-api`**  
  Serviço que simula automaticamente a criação de pedidos e publica mensagens na fila do RabbitMQ (`order_queue`).

- **`payment-worker-service-api`**  
  Serviço assíncrono (worker) que escuta a fila `order_queue`, processa os dados do pedido, simula a integração com o gateway de pagamento e envia o retorno para a fila do RabbitMQ (`payment_response_queue`).

- **`invoice-service-api`**  
  Escuta eventos `PaymentProcessed`, acumula os dados de pagamento e gera faturas em lote.

- **`notification-service-api`**  
  Escuta eventos de outros serviços e envia notificações (logs, e-mails, etc.).

---

## ✅ Status do Projeto

### `order-service-api`

- [x] Gera pedidos fictícios automaticamente ao iniciar
- [x] Salva pedidos na tabela `order`
- [x] Envia os dados do pedido para a fila do RabbitMQ (`order_queue`)
- [ ] Escuta a fila do RabbitMQ (`payment_response_queue`)
- [ ] Atualiza o status do pedido

### `payment-worker-service-api`

- [x] Escuta a fila do RabbitMQ (`order_queue`)
- [x] Processa e persiste dados no banco
- [ ] Simula gateway de pagamento com status `PAID` ou `FAILED`
- [ ] Envia os dados de retorno do pagamento para a fila do RabbitMQ (`payment_response_queue`)

### `invoice-service-api`

- [ ] Escuta eventos `PaymentProcessed`
- [ ] Gera faturas em lote

### `notification-service-api`

- [ ] Escuta eventos do sistema
- [ ] Envia notificações (ex: pedido criado, pagamento confirmado, etc.)

---

## 🛠️ Tecnologias Utilizadas

- Node.js + Express
- RabbitMQ
- Redis
- Docker & Docker Compose
- MySQL (um por serviço)
- Prisma ORM
- Arquitetura Orientada a Eventos (EDA)
- **Pino** para registrar logs estruturados

---

## 🚀 Como Rodar Localmente

### 1. Clone o repositório

```bash
git clone https://github.com/rubensgf/order-processing-system-rabbitmq.git
cd order-processing-system-rabbitmq
docker compose up --build -d
```
