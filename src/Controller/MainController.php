<?php

namespace App\Controller;

use App\Entity\Company;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Contracts\Translation\TranslatorInterface;

class MainController extends AbstractController
{
    #[Route('/', name: 'app_main')]
    public function index(TranslatorInterface $translator): Response
    {

        /*
        $company = new Company();
        $form = $this->createFormBuilder(new Company())
            ->add('name', TextType::class)
            ->add('save', SubmitType::class, ['label' => $translator->trans('Scrap')])
            ->getForm();
            */


        return $this->render('main/index.html.twig', [
            'controller_name' => 'MainController',
            #'form' => $form,
        ]);
    }
}
