import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CrudService } from './service/crud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  formValue!: FormGroup;
  title = 'PostApp';
  posts!:any;
  editPostModal:any;
  updateFormValue!:FormGroup;

  constructor(private formBuilder:FormBuilder,private service:CrudService){

  }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      userId: [''],
      title: [''],
      body: ['']
    })

    this.updateFormValue =this.formBuilder.group({
      updateUserId:[''],
      updateTitle:[''],
      updateBody:['']
    })

    this.getAllData()
  }

  getAllData(){
    this.service.getData().subscribe((res)=>{
      this.posts = res
      console.log(this.posts);
    })
  }

  postData(){
    const {value} = this.formValue
    console.log(value);

    const postObj = {
      id: value.userId,
      userId: value.userId,
      title: value.title,
      body: value.body
    }

    this.service.postData(postObj).subscribe((res)=>{
      console.log(res);
      postObj['id'] = res.id;

      this.posts.push(postObj);
      this.formValue.reset();
    })
  }

  editModal(editPost: any){
    console.log(editPost)
    this.editPostModal = editPost;
  }

  updatePost(){
    const {value} = this.updateFormValue 

    const postObj = {
      id: value.updateUserId,
      user: value.updateUserId,
      title: value.updateTitle,
      body: value.updateBody
    }

    this.service.updateData(postObj,this.editPostModal.id).subscribe(
      (res)=>{
        console.log(res)
      }
    )
  }

  deletePost(post:any){
    this.service.deleteData(post.id).subscribe((res=>{
      let index = this.posts.indexOf(post);
      this.posts.splice(index,1)
    }))
  }
}
