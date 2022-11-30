import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Livro } from 'src/app/models/livro';
import { LivroService } from 'src/app/services/livro.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.css']
})
export class LivrosComponent implements OnInit {

  public livrosList!: Livro[];
  public displayedColumns = ['titulo', 'categoria', 'autor', 'isbn', 'excluir', 'capa'];
  public dataSource!: MatTableDataSource<Livro>;
  public formAdicionarLivro: FormGroup;

  constructor(
    private livroService: LivroService,
    private notification: NotificationService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.formAdicionarLivro = fb.group({
      titulo: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      capa: ['', [Validators.required]],
      autor: ['', [Validators.required]],
      isbn: ['', [Validators.required]]
    });
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.loadingTable();
  }

  private loadingTable() {
    this.livroService.findAll().subscribe(response => {
      this.dataSource = new MatTableDataSource(response);
    });
  }

  public deleteBook(id: string): void {
    this.livroService.deleteBook(id).subscribe(response => {
      this.notification.showMessage("Apagado.");
      this.loadingTable();
    });
  }

  public createBook(): void {
    if(this.formAdicionarLivro.valid) {
      const novoLivro: Livro = this.formAdicionarLivro.value;
      this.livroService.createBook(novoLivro).subscribe(response => {
        this.notification.showMessage("Novo livro adicionado com sucesso.");
        this.loadingTable();
      });
    }
    else {
      this.notification.showMessage("Dados inválidos.");
    }
  }

}
