# Plataforma de Reservas de Viagens – Projeto MongoDB

## Visão Geral do Projeto

Este projeto consiste no desenvolvimento de uma **Plataforma de Reservas de Viagens (Travel Booking Platform)** utilizando **MongoDB** como base de dados NoSQL principal.  
O sistema representa um cenário real de reservas de viagens, permitindo aos utilizadores consultar destinos, efetuar reservas e gerir as suas viagens.

O projeto foi desenvolvido no âmbito da unidade curricular de **NoSQL Databases**, com foco na modelação de dados orientada a documentos, execução de queries em MongoDB, agregações, indexação e otimização de performance.

---

## Objetivos do Projeto

Os principais objetivos deste projeto são:

- Conceber um **modelo de dados orientado a documentos** adequado a uma plataforma de reservas
- Implementar operações **CRUD** e **pipelines de agregação** em MongoDB
- Aplicar **estratégias de indexação** para melhorar o desempenho das queries
- Garantir **validação de dados** e integridade da informação
- Documentar decisões técnicas e compromissos de design adotados

---

## Resumo do Modelo de Dados

A plataforma é composta pelas seguintes coleções principais:

- **users** – informação dos utilizadores (perfil e dados de conta)
- **destinations** – destinos de viagem e pacotes disponíveis
- **bookings** – reservas efetuadas pelos utilizadores
- **reviews** (opcional) – avaliações e comentários sobre destinos

As relações entre as coleções são implementadas maioritariamente através de **referências**, permitindo flexibilidade, escalabilidade e redução de duplicação de dados.

---

## Funcionalidades Principais

- Gestão de utilizadores
- Consulta de destinos e pacotes de viagem
- Criação, atualização e cancelamento de reservas
- Análise de dados através de agregações (ex.: destinos mais reservados)
- Otimização de desempenho com índices MongoDB

---

## Estrutura do Projeto

project/
├── README.md
├── architecture.md
├── solution.md
├── data/
├── queries/
└── tests/



Cada pasta contém os scripts e documentação necessários para a correta implementação, execução e validação do sistema.

---

## Tecnologias Utilizadas

- **MongoDB** (Base de dados NoSQL)
- **mongosh** (MongoDB Shell)
- **Node.js** (execução de scripts)
- **Git/GitHub** (controlo de versões e colaboração)

---

## Conclusão

Este projeto demonstra a aplicação prática de conceitos fundamentais de bases de dados NoSQL, utilizando MongoDB para resolver um problema realista do domínio das viagens e reservas, com especial atenção à modelação, performance e boas práticas de desenvolvimento.
