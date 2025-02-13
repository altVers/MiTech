## Запуск сервера 
Установить Postgresql 17.2

### Устанавливаем зависимости 
```
npm i
```

### В терминале поднимаем сервер
```
"C:\Program Files\PostgreSQL\17\bin\pg_ctl" start -D "C:\Program Files\PostgreSQL\17\data"
```

### Затем запускаем сборку 
```
npm run dev
```