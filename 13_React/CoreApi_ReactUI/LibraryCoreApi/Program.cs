
//app.Run();
using LibraryCoreApi.DAL.Interfaces;
using LibraryCoreApi.DAL.Repositories;
using LibraryCoreApi.Data;
using LibraryCoreApi.Entities;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DbCon")));

// Register repositories
builder.Services.AddTransient<IRepository<Category>, CategoryRepository>();
builder.Services.AddTransient<IRepository<Author>, AuthorRepository>();
builder.Services.AddTransient<IRepository<Publisher>, PublisherRepository>();
builder.Services.AddTransient<IBookRepository, BookRepository>();

// Configure CORS
//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowOrigin", policy =>
//        policy.WithOrigins("http://localhost:3000")
//              .AllowAnyHeader()
//              .AllowAnyMethod());
//});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowOrigin", policy =>
        policy.WithOrigins("http://localhost:3000", "http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

// Configure Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();

// Apply CORS policy
app.UseCors("AllowOrigin");

app.UseAuthorization();

// Map controllers
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.Run();

